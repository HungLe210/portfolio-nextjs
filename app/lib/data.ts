import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    LatestInvoiceRaw,
    Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        console.log('Fetching revenue data...');
        //await new Promise((resolve) => setTimeout(resolve, 3000));

        //const data = await sql<Revenue>`SELECT * FROM revenue`;
        const data = {
            command: 'SELECT',
            rowCount: 12,
            rows: [
                { month: 'Jan', revenue: 2000 },
                { month: 'Feb', revenue: 1800 },
                { month: 'Mar', revenue: 2200 },
                { month: 'Apr', revenue: 2500 },
                { month: 'May', revenue: 2300 },
                { month: 'Jun', revenue: 3200 },
                { month: 'Jul', revenue: 3500 },
                { month: 'Aug', revenue: 3700 },
                { month: 'Sep', revenue: 2500 },
                { month: 'Oct', revenue: 2800 },
                { month: 'Nov', revenue: 3000 },
                { month: 'Dec', revenue: 4800 }
            ],
            fields: [
                {
                    name: 'month',
                    dataTypeID: 1043,
                    tableID: 24611,
                    columnID: 1,
                    dataTypeSize: -1,
                    dataTypeModifier: 8,
                    format: 'text'
                },
                {
                    name: 'revenue',
                    dataTypeID: 23,
                    tableID: 24611,
                    columnID: 2,
                    dataTypeSize: 4,
                    dataTypeModifier: -1,
                    format: 'text'
                }
            ],
            rowAsArray: false,
            viaNeonFetch: true
        }
        console.log("DATA: ????? ", data);

        console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices() {
    try {

        console.log('Fetching latest invoices data...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

        console.log('InvoicesData fetch completed after 2 seconds.');

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchCardData() {
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);

        const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
        const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return invoices.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchInvoiceById(id: string) {
    //noStore();
    try {
        const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

        const invoice = data.rows.map((invoice) => ({
            ...invoice,
            // Convert amount from cents to dollars
            amount: invoice.amount / 100,
        }));

        console.log(invoice); // Invoice is an empty array []
        return invoice[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

        const customers = data.rows;
        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

        const customers = data.rows.map((customer) => ({
            ...customer,
            total_pending: formatCurrency(customer.total_pending),
            total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}



export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string[];
    rating: number;
    director: string;
    actors: string[];
    description: string;
    awards: string;
    country: string[];
}


export async function fetchMovies(): Promise<Movie[]> {
    try {
        const response = await fetch("https://freetestapi.com/api/v1/movies?limit=5");
        const data = await response.json();

        const movieData: Movie[] = data.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            rating: movie.rating,
            director: movie.director,
            actors: movie.actors,
            plot: movie.plot, // Assuming "plot" is the description
            awards: movie.awards,
            country: movie.country
        }));

        return movieData;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}