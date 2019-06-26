import React, { Component } from 'react';
import axios from 'axios';
import Customer from './Customer';

const URL_CUSTOMERS = 'http://localhost:4000/customers';

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      allCustomers: [],
      errorMessage: [],
      selectedCustomer: '',
    }
  }

  componentDidMount = () => {
    const allCustomers = [];
    axios.get(URL_CUSTOMERS)
    .then((response) => {
      response.data.forEach((element) => {
        allCustomers.push(element);
      })
      this.setState({allCustomers, });
    })
    .catch((error) => {
      const errorMessage = this.state.errorMessage;
      const newError = error.response.data.errors.text;
      newError.forEach((text) => {
        errorMessage.push(text);
      })
      this.setState({errorMessage, });
    })
  }

  updateSelected = (customerId) => {
    this.state.allCustomers.forEach((customer) => {
      if(customer.id === parseInt(customerId, 10)) {
        this.setState({
          selectedCustomer: customer.name,
        })
      }
    })
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    this.props.selectedCustomer(this.state.selectedCustomer);
  }

  displayCustomers = () => {
    const displayedCustomers = this.state.allCustomers.map((customer) => {
      return(
        <Customer
          key={customer.id}
          customerId={customer.id}
          name={customer.name}
          numMoviesCheckedOut={customer.movies_checked_out_count}
          accountCredit={customer.account_credit}
          selectedCallback={this.updateSelected}
          isSelected={this.state.selectedCustomer}
        />
      )
    })
    return (
      <table className="table">
        <thead>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Movies Checked Out Count</th>
          <th scope="col">Account Credit</th>
          <th scope="col"></th>
        </thead>
        <tbody>
          {displayedCustomers}
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <section>
        <h3>All Customers</h3>
        {this.displayCustomers()}
      </section>
    )
  }
}

export default CustomerList;