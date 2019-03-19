import React from 'react';
import RealtimeEvents from '../components/RealtimeEvents';

let interval;

class TransactionMonitor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          clearInterval: false
        }

    }

    componentDidMount() {
      interval = setInterval(function() {
          this.pollEvents()
      }.bind(this), 10000);
    }

    componentWillUnmount() {
      clearInterval(interval)
    }

    pollEvents = () => {
      if(this.props.isMaster) {
        this.props.getAllEvents()
       }
       if(this.props.isAdmin) {
        this.props.getAllEventsByCustomer()
       }
       if(this.props.isGuard) {
        this.props.getAllEventsByGate()
       }
       if(this.props.isClient) {
        this.props.getAllEventsByCustomer()
       }
    }


    

    render() {

        return (
            
        
            <div style={{ marginTop: '-24px' }}>
              <h1>Event Monitor</h1>

              {this.props.events.length === 0 ? 
                <p>No Events Found.</p> :
                null
              }
              { this.props.customerId && this.props.events.length >= 1 ? 
                <RealtimeEvents userId={ this.props.userId }
                                customerId={ this.props.customerId }
                                events={ this.props.events }

                                refresh={ this.props.refresh }
                                refreshTable={ this.props.refreshTable }

                                isMaster={ this.props.isMaster }
                                isAdmin={ this.props.isAdmin }
                                isGuard={ this.props.isGuard }
                                isClient={ this.props.isClient } /> :
              null }

             </div>
        )
    }
}

export default TransactionMonitor;

