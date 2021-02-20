import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';


const Dashboard = () => {
    
    const data_pie = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

    const data_bar = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };
    
    return ( 

        <div id="dashboard" className="col m12 l10 px5 py20">
            <h5 className="fw-700"><i className="material-icons">dashboard</i>  My dashboard</h5>
            <div className="row">
                <div className="col s12 m6 l3">
                    <div className="card-panel red lighten-1 white-text py10 px20">
                        <div className="left-align">
                            <span className="card-title fs-24">Alerts <br/><b>0</b></span>
                        </div>
                        <div className="right-align fs-56">
                            <i className="fas fa-exclamation"></i>
                        </div>
                    </div>                        
                </div>
                <div className="col s12 m6 l3">
                    <div className="card-panel blue lighten-1 white-text py10 px20">
                        <div className="left-align">
                            <span className="card-title fs-24">Products sold <br/><b>15</b></span>
                        </div>
                        <div className="right-align fs-56">
                            <i className="fas fa-utensils"></i>
                        </div>
                    </div>                        
                </div>
                <div className="col s12 m6 l3">
                    <div className="card-panel teal lighten-1 white-text py10 px20">
                        <div className="left-align">
                            <span className="card-title fs-24">Earnings <br/><b>$1500</b></span>
                        </div>
                        <div className="right-align fs-56">
                            <i className="fas fa-money-bill-wave-alt"></i>
                        </div>
                    </div>                        
                </div>
                <div className="col s12 m6 l3">
                    <div className="card-panel amber lighten-1 white-text py10 px20">
                        <div className="left-align">
                            <span className="card-title fs-24">Clients <br/><b>50</b></span>
                        </div>
                        <div className="right-align fs-56">
                            <i className="fas fa-users"></i>
                        </div>
                    </div>                        
                </div>
            </div>

            <div className="row" id="charts">

                <div id="year_div" className="card col s12 l6">
                    <div className="card-content">
                        <span className="card-title">Solds of the year</span>
                        <Pie data={data_pie} />
                    </div>
                </div>
                <div id="day_div" className="card col s12 l6">
                    <div className="card-content">
                        <span className="card-title">Sold of today</span>
                        <Bar
                            data={data_bar}
                        />
                    </div>
                </div>
                
            </div>
        </div>

    );
}
 
export default Dashboard;