import React from "react";
import {IndexNavbar} from "./IndexNavbar";
import TextField from '@material-ui/core/TextField';
import {ThemeProvider, createMuiTheme} from '@material-ui/core';
import {Button, Container} from "reactstrap";
//import {Redirect} from 'react-router-dom';
//import SQLite from 'react-native-sqlite-storage';
import {Formik} from "formik";
import * as Yup from "yup";

//let db;
export class LoginPage extends React.Component {
	/*componentDidMount() {
		db = SQLite.openDatabase({name: "purrdevDB", createFromLocation: "C:/Users/Zack/Documents/Delicat/api/purrdev.db"},
			this.openSuccess, this.openError
		);
	}

	componentWillUnmount() {
		this.closeDatabase();
	}

	openSuccess() {
		console.log("Database is opened");
	}

	openError(err) {
		console.log("error: ", err);
	}

	closeDatabase = () => {
		if(db) {
			console.log("Closing Database ...");
			db.close();
		} else {
			console.log("Database was not OPENED");
		}
	}*/

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
			email: Yup.string()
				.email()
				.required("Required"),
			password: Yup.string()
				.required("No password provided.")
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
							initialValues={{email: "", password: ""}}
							validationSchema={validationSchema}
							onSubmit={(values, {setSubmitting}) => {
								setTimeout(() => {
									console.log("Logging in", values);
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
								<h1 className="title">Login</h1>
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
									<Button color="success" type="submit" disabled={props.isSubmitting}>Log In</Button>
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