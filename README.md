# PipetGo Mockup

A single-page JavaScript mockup for a laboratory service marketplace platform. This demo simulates dashboards and workflows for four roles: Customer, Laboratory, Logistics, and Administrator.

## Features

- **Role-based Dashboards:** Switch between Customer, Laboratory, Logistics, and Admin views.
- **Mock Data:** Simulated services, labs, orders, quotes, pickups, users, and transactions.
- **Dynamic UI:** Sidebar navigation, modal dialogs, status badges, and forms.
- **No Backend:** All data and logic are in `script.js` for demonstration purposes.


## Database Schema  

The schema below is MVP-focused but built with enough structure to be scalable. It includes tables for users, labs, services, orders, quotes, transactions, logistics tasks, reviews, and — importantly — a dedicated lab reports table for versioning and metadata.

Can implement the design in SQL DDL similar to the snippet below:

---

```sql
-- 1. Users Table
-- Roles include: Customer, Laboratory, Logistics, Administrator
CREATE TABLE Users (
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(50) NOT NULL,  -- e.g., 'Customer', 'Laboratory', 'Logistics', 'Administrator'
    status          VARCHAR(50) DEFAULT 'Active',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Labs Table
-- A lab profile linked to a User account (e.g., lab admin)
CREATE TABLE Labs (
    lab_id          SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    address         VARCHAR(255),
    city            VARCHAR(100),
    province        VARCHAR(100),
    country         VARCHAR(100) DEFAULT 'Philippines',
    contact_number  VARCHAR(20),
    certifications  TEXT,  -- Comma-separated list of certifications, or later normalised into a separate table
    specialties     TEXT,  -- Could also be normalized into a lookup table if needed
    rating          DECIMAL(2,1),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Services Table
-- Services are offered by Labs.
CREATE TABLE Services (
    service_id      SERIAL PRIMARY KEY,
    lab_id          INTEGER REFERENCES Labs(lab_id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    category        VARCHAR(100),
    keywords        TEXT,  -- Optionally store as comma-separated keywords or normalize later
    price_est       DECIMAL(10,2),  -- Pricing in the local currency (Philippine Peso)
    turnaround_time VARCHAR(100),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
-- Orders link customers, labs, and a particular service.
CREATE TABLE Orders (
    order_id          SERIAL PRIMARY KEY,
    customer_id       INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,
    lab_id            INTEGER REFERENCES Labs(lab_id) ON DELETE SET NULL,
    service_id        INTEGER REFERENCES Services(service_id) ON DELETE SET NULL,
    order_date        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status            VARCHAR(50) NOT NULL,   -- e.g., 'Pending', 'In Progress', 'Completed'
    logistics_status  VARCHAR(50),           -- e.g., 'Sample Delivered', 'Awaiting Pickup'
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Removed final_report_url (see Lab_Reports table below)
);

-- 5. Lab_Reports Table
-- Stores metadata and versioning history for lab reports.
CREATE TABLE Lab_Reports (
    report_id           SERIAL PRIMARY KEY,
    order_id            INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE,
    uploaded_by_user_id INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,  -- lab staff or system
    file_name           VARCHAR(255) NOT NULL,
    file_url            VARCHAR(500) NOT NULL,   -- URL or blob/storage reference
    file_type           VARCHAR(50),
    file_size_bytes     INTEGER,
    version             INTEGER DEFAULT 1,
    notes               TEXT,
    upload_date         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Quotes Table
-- Communications for custom pricing; could be linked to an order or service request.
CREATE TABLE Quotes (
    quote_id       SERIAL PRIMARY KEY,
    order_id       INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE,
    lab_id         INTEGER REFERENCES Labs(lab_id) ON DELETE SET NULL,
    customer_id    INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,
    service_id     INTEGER REFERENCES Services(service_id) ON DELETE SET NULL,
    status         VARCHAR(50),         -- e.g., 'Submitted', 'Received', 'Responded'
    details        TEXT,
    date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Transactions Table
-- Tracks payments and payouts.
CREATE TABLE Transactions (
    transaction_id   SERIAL PRIMARY KEY,
    order_id         INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE,
    type             VARCHAR(50),   -- e.g., 'Service Payment', 'Lab Payout'
    amount           DECIMAL(10,2) NOT NULL,
    client_id        INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,  -- usually a customer making a payment
    lab_id           INTEGER REFERENCES Labs(lab_id) ON DELETE SET NULL,
    status           VARCHAR(50),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. LogisticsTasks Table
-- Handles sample pickup, delivery, and other logistics tasks.
CREATE TABLE LogisticsTasks (
    task_id         SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE,
    pickup_address  VARCHAR(255),
    delivery_address VARCHAR(255),
    assigned_to     INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,  -- assigned logistics personnel
    status          VARCHAR(50),             -- e.g., 'Pending', 'In Transit', 'Delivered'
    scheduled_date  TIMESTAMP,
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Reviews Table
-- Supports reviews for labs or services.
CREATE TABLE Reviews (
    review_id    SERIAL PRIMARY KEY,
    user_id      INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,  -- the customer writing the review
    lab_id       INTEGER REFERENCES Labs(lab_id) ON DELETE CASCADE,     -- or you could set up a review for a specific service
    service_id   INTEGER REFERENCES Services(service_id) ON DELETE CASCADE,
    rating       INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment      TEXT,
    review_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Explanation of the Schema

- **Users:**  
  All system participants (customers, lab representatives, logistics personnel, and administrators) are represented here. The `role` field can later be refined into an ENUM or joined with a separate Roles table if needed.

- **Labs:**  
  Stores laboratory profiles and is linked to a lab’s user account. Includes fields for contact and location information as well as additional details (certifications, specialties, ratings).

- **Services:**  
  Lists available testing or analytical services offered by each lab. It includes pricing estimates and turnaround times.

- **Orders:**  
  Represents orders placed by customers that link a service, lab, and customer together. Note that the final lab report URL is removed here and moved to a dedicated table.

- **Lab_Reports:**  
  A stand-alone table to enable future versioning and richer metadata for lab reports. Each report is linked to an order and identifies who uploaded it, along with file details.

- **Quotes:**  
  Handles custom pricing inquiries and communications. Quotes may reference orders, services, and involve both labs and customers.

- **Transactions:**  
  Captures financial transactions for payments from customers (service payments) and payouts to labs, ensuring a clear audit trail.

- **LogisticsTasks:**  
  Manages the processes around sample pickup, delivery, and any transportation needs, with links to the associated order and the responsible logistics personnel.

- **Reviews:**  
  Allows customers to rate and comment on their experience with specific labs or services. This data can later be used to drive reputation and trust features within the platform.

---

### Notes: Next Steps

- **MVP vs. Feature-Rich:**  
  For an MVP, keep some fields simpler (for example, storing keys as strings or JSON blobs) but planning a relational schema now offers flexibility to expand (such as normalizing certifications or specialties later).

- **Indexes & Performance:**  
  As platform scales, add indexes on foreign keys and columns that are frequently filtered (e.g., status fields).

- **Data Integrity:**  
  Use appropriate constraints (such as CHECK constraints on ratings or statuses) and foreign key relationships to maintain data integrity.

## License
WIP