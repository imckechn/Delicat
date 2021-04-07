import React from "react";
import {IndexNavbar} from "./IndexNavbar";
import TextField from '@material-ui/core/TextField';
import {ThemeProvider, createMuiTheme} from '@material-ui/core';
import {Button, Container} from "reactstrap";
//import {Redirect} from 'react-router-dom';
//import SQLite from 'react-native-sqlite-storage';
import {Formik} from "formik";
import * as Yup from "yup";

export class RegisterPage extends React.Component {
	render() {
		const theme = createMuiTheme({
			palette: {
				primary: {
					light: '#6bd098',
		  			main: '#6bd098',
		  			dark: '#28a745',
		  			contrastText: '#fff',
				},
				type: 'dark',
			},
		});

		const validationSchema = Yup.object({
			first: Yup.string()
				.required("First Name is required."),
			last: Yup.string()
				.required("Last Name is required"),
			email: Yup.string()
				.email("Not a valid email")
				.required("No email provided"),
			password: Yup.string()
				.required("No password provided."),
			confirmpassword: Yup.string()
				.required("Must confirm password.")
				.oneOf([Yup.ref('password'), null], "Passwords must match.")
		});

		return(
			<>
				<IndexNavbar />
				<>
				<div
				className="page-header section-dark"
				style={{backgroundImage:"url(" + require("assets/img/produce.jpg").default + ")",}}>
				<div className="filter" />
				<div className="content-center">
					<Container>
						<div className="login-info">
						<Formik 
							initialValues={{
								first: "",
								last: "",
								email: "", 
								password: "", 
								confirmpassword: ""
							}}
							validationSchema={validationSchema}
							onSubmit={(values, {setSubmitting}) => {
								setTimeout(() => {
									console.log("Registering Account", values);
									setSubmitting(false);
								}, 500);
								/*db.transaction((tx) => {
									const sql = `SELECT * FROM users WHERE email='${this.props.values.email}'`;
									tx.executeSql(sql, [], (tx, results) => {
										const len = results.rows.length;
										if(!len) {
											alert('This account does not exist!');
										} else {
											const row = results.rows.item(0);
											if(this.props.values.password === row.password) {
												return <Redirect to='/' />
											}
											alert('Authentication failed!');
										}
									});
								});*/
							}}
						>

							{props => (
								<form onSubmit={props.handleSubmit}>
								<ThemeProvider theme={theme}>
								<h1 className="title">Create an Account</h1>
									{props.errors.first && props.touched.first && (
										<div align="left" className="input-feedback">{props.errors.first}</div>
									)}
									<TextField
										id="first"
										name="first"
										label="First Name"
										variant="outlined"
										value={props.values.first}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										className={props.errors.first && props.touched.first && "error"}
									/>
									<b>&nbsp;&nbsp;&nbsp;</b>
									<TextField
										id="last"
										name="last"
										label="Last Name"
										variant="outlined"
										value={props.values.last}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										className={props.errors.last && props.touched.last && "error"}
									/>
									{props.errors.last && props.touched.last && (
										<div align="right" className="input-feedback">{props.errors.last}</div>
									)}
									<br></br>
									<br></br>
									<TextField
										id="email"
										name="email"
										label="Email"
										variant="outlined"
										fullWidth
										value={props.values.email}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										className={props.errors.email && props.touched.email && "error"}
									/>
									{props.errors.email && props.touched.email && (
										<div className="input-feedback">{props.errors.email}</div>
									)}
									<br></br>
									<br></br>
									<TextField
										id="password"
										name="password"
										label="Password"
										variant="outlined"
										fullWidth
										value={props.values.password}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										className={props.errors.password && props.touched.password && "error"}
									/>
									{props.errors.password && props.touched.password &&(
										<div className="input-feedback">{props.errors.password}</div>
									)}
									<br></br>
									<br></br>
									<TextField
										id="confirmpasssword"
										name="confirmpassword"
										label="Confirm Password"
										variant="outlined"
										fullWidth
										value={props.values.confirmpassword}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										className={props.errors.confirmpassword && props.touched.confirmpassword && "error"}
									/>
									{props.errors.confirmpassword && props.touched.confirmpassword &&(
										<div className="input-feedback">{props.errors.confirmpassword}</div>
									)}
									<br></br>
									<br></br>
									<Button color="success" type="submit" disabled={props.isSubmitting}>Register</Button>
									<br></br>
								</ThemeProvider>
								</form>
							)}
						</Formik>	
						</div>
					</Container>
				</div>
				</div>
				</>
				<div className="main">
				</div>
			</>
		);
	}
}