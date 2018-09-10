set schema 'ers';

CREATE TABLE ers_reimbursement_status(
	reimb_status_id SERIAL PRIMARY KEY,
	reimb_status VARCHAR(10)
);
CREATE TABLE ers_reimbursement_type(
	reimb_type_id SERIAL PRIMARY KEY,
	reimb_type VARCHAR(10)
);
CREATE TABLE ers_user_roles(
	ers_user_role_id SERIAL PRIMARY KEY,
	user_role VARCHAR(10)
);
CREATE TABLE ers_users(
	ers_users_id SERIAL PRIMARY KEY,
	ers_username VARCHAR(50) UNIQUE NOT NULL,
	ers_password VARCHAR(50) NOT NULL,
	user_first_name VARCHAR(100),
	user_last_name VARCHAR(100),
	user_email VARCHAR(150),
	user_role_id SERIAL REFERENCES ers_user_roles(ers_user_role_id)
	ON UPDATE CASCADE ON DELETE CASCADE 
);
CREATE TABLE ers_reimbursement(
	reimb_id SERIAL PRIMARY KEY, 
	reimb_amount NUMERIC(10,2),
	reimb_submitted TIMESTAMP,
	reimb_resolved TIMESTAMP,
	reimb_description VARCHAR(250),
	reimb_author SERIAL REFERENCES ers_users(ers_users_id)
	ON UPDATE CASCADE ON DELETE CASCADE,
	reimb_resolver SERIAL REFERENCES ers_users(ers_users_id)
	ON UPDATE CASCADE ON DELETE CASCADE,
	reimb_status_id SERIAL REFERENCES ers_reimbursement_status(reimb_status_id)
	ON UPDATE CASCADE ON DELETE CASCADE,
	reimb_type_id SERIAL REFERENCES ers_reimbursement_type(reimb_type_id)
	ON UPDATE CASCADE ON DELETE CASCADE
)