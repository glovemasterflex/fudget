class Bills extends React.Component{
  constructor(props) {
    super(props);
    this.state = { bills: this.props.bills };
    this.addBill = this.addBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.updateBill = this.updateBill.bind(this);
  }

  updateBill(id, bill) {
    $.ajax({
      url: `/bill/${id}`,
      type: 'PUT',
      data: { bill: {...bill}},
      dataType: 'JSON'
    }).success( bill => {
      let bills = this.state.bills;
      let editBill = bills.find( b => b.id === bill.id)
      editBill.name = bill.name;
      editBill.description = bill.description;
      setState({ bill: bills });
    });
  }

  deleteBill(id) {
    $.ajax({
      url: `/bills/${id}`,
      type: 'DELETE'
    }).success( bill => {
      let bills = this.state.bills;
      let index = bills.findIndex( b => b.id === bill.id);
      bills.splice(index, 1)
      this.setState({ bills: bills });
    });
  }

  addBill(b) {
    this.setState({ bills: [bill, ...this.state.bills]});
  }

  render() {
    let bills = this.state.bills.map( bill => {
      return(<Bill key={`bill-${bill.id}`} {...bill} delete={this.deleteBill} updateBill={this.updateBill} />);
    });
    return(
      <div className="row">
        <h2 className="center">bills</h2>
        {bills}
      </div>
    );
  }
}