import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty, map, size } from "lodash"
import { Link, withRouter } from "react-router-dom"
import classNames from "classnames"
import BarChart from "../AllCharts/apex/barchart"
import { Card, Table, TableBody, TableHeader, CardBody, CardHeader, Collapse, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap"
import {
	  Input,
	  Label,
	  Button,
	  FormGroup,
} from "reactstrap"

import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//
//Import Date Picker
import DatePicker from "react-datepicker"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ReactApexChart from "react-apexcharts"

//Import Images
import images from "../../assets/images"

import { getTasks } from "../../store/tasks/actions"
import { options, series, statusClasses } from "common/data/tasks"

const TasksList = props => {
  const { tasks, onGetTasks } = props
  const series = [
      {
            name: "Tomato",
            data: [0,0, 0, 0, 10, 40, 80, 40, 20, 0, 0, 0],
      },
      {
            name: "Oregano",
            data: [0,0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      }
    ]
  const options = {
	      chart: {
		 toolbar: {
		   show: true,
		 },
		 stacked:true
	      },
	      plotOptions: {
		 bar: {
		    dataLabels: {
		      position: "top", // top, center, bottom
	            },
	         },
              },
	      grid: {
		 borderColor: "#f1f1f1",
	      },
	      xaxis: {
		   categories: [
	            "Jan",
	            "Feb",
	            "Mar",
	            "Apr",
	            "May",
	            "Jun",
	            "Jul",
	            "Aug",
	            "Sep",
	            "Oct",
	            "Nov",
	            "Dec",
	          ],
	           position: "bottom",
	            labels: {
	            offsetY: 0,
	          },
	           axisBorder: {
		     show: true,
	          },
	           axisTicks: {
	            show: false,
	          },
	           crosshairs: {
	            fill: {
		              type: "gradient",
	            gradient: {
	                  colorFrom: "#D8E3F0",
	                  colorTo: "#BED1E6",
	                  stops: [0, 100],
	                  opacityFrom: 0.4,
	                  opacityTo: 0.5,
	                },
	            },
	          },
	          tooltip: {
	            enabled: true,
	            offsetY: -35,
	          },
	      },
	      fill: {
		   gradient: {
		           shade: "light",
		           type: "horizontal",
		           shadeIntensity: 0.25,
		           gradientToColors: undefined,
		            inverseColors: true,
		            opacityFrom: 1,
		            opacityTo: 1,
		            stops: [50, 0, 100, 100],
	          },
	      },
	      yaxis: {
		  axisBorder: {
		            show: true,
		  },
		  axisTicks: {
			   show: false,
	          },
	           labels: {
		            show: false,
		            formatter: function (val) {
		              return val + " ounces"
		            },
		   },
	      },
	      title: {
	            text: "Front Bed Yields",
	            floating: true,
	            offsetY: 400,
		            align: "center",
		            style: {
			            color: "#444",
			    },
		    },
	    };


useEffect(() => {
    onGetTasks()
  }, [onGetTasks])

  const recentTasks = tasks.find(task => task.title === "Recent Tasks")
  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [design1, setdesign1] = useState(true)
  const [design2, setdesign2] = useState(false)
  const [chartData, setChartData] = useState(series)
  const [inputFields, setinputFields] = useState(inpRow)

  const designerModel =  {
	      "id": "2435sdfasfsdfa",
	      "user": "dave2",
	      "title": "Dave's Garden 2021",
	      "status": "live",
	      "year": "2021",
	      "zipcode": "20164",
	      "dimensions": {
		             "unit": "feet",
		             "width": "40",
		             "height": "40"
		          },
	  	"plants": [
			        {
					          id: "broccoli_1",
					          species: "broccoli",
					          family: "brassica",
					          variety: "De Cicco",
					          location: {
							               x: 72,
							               y: 74,
							               plot: "raised_bed2"
							            },
					          status: {
							               "seed_started": true,
							               "transplanted": true,
							               "harvested": true,
							               "failed": false,
							               "failed_reason": false
							            },
					          harvests:  [{
							               yield: "10",
							               month: "5",
							               year: "2021", 
							               unit: "ounces"
							            },
							             {
									                 yield: "7",
									                  month: "4",
									                  year: "2021", 
									                  unit: "ounces"
									                },
							             {
									                 yield: "3",
									                  month: "3",
									                  year: "2021", 
									                  unit: "ounces"
									                  }]
					        },
			        {
					          id: "garlic_1",
					          species: "garlic",
					          family: "allium",
					          variety: "Inchelium Red",
					          location: {
							               x: 72,
							               y: 74,
							               plot: "raised_bed2"
							            },
					          status: {
							               "seed_started": true,
							               "transplanted": true,
							               "harvested": true,
							               "failed": false,
							               "failed_reason": false
							            },
					          harvests:  [{
							               yield: "135",
							               month: "6",
							               year: "2021", 
							               unit: "ounces"
							            }]
					        },
			        {
					          id: "potato_1",
					          species: "potato",
					          family: "solanacea",
					          variety: "Adirondack Red",
					          location: {
							               x: 72,
							               y: 74,
							               plot: "raised_bed2"
							            },
					          status: {
							               "seed_started": true,
							               "transplanted": true,
							               "harvested": true,
							               "failed": false,
							               "failed_reason": false
							            },
					          harvests:  [{
							               yield: "60",
							               month: "6",
							               year: "2021", 
							               unit: "ounces"
							            },
							            {
									                 yield: "14",
									                 month: "7",
									                 year: "2021", 
									                 unit: "ounces"
									              }]
					        },
			        {
					          id: "peas_1",
					          species: "pea",
					          variety: "Oregon Giant Snow Pea",
					          family: "legume",
					          location: {
							               x: 72,
							               y: 74,
							               plot: "raised_bed1"
							            },
					          status: {
							               "seed_started": true,
							               "transplanted": true,
							               "harvested": true,
							               "failed": false,
							               "failed_reason": false
							            },
					          harvests:  [{
							               yield: "25",
							               month: "5",
							               year: "2021", 
							               unit: "ounces"
							            }]
					        },
			        {
					          id: "tomato_1",
					          title: "",
					          species: "tomato",
					          family: "solanacea",
					          variety: "salveterra's select",
					          location: {
							               x: 283,
							               y: 144,
							               plot: "raised_bed1"
							            },
					          status: {
							               "seed_started": true,
							               "transplanted": true,
							               "harvested": true,
							               "failed": false,
							               "failed_reason": false
							            },
					          harvests: [{
							               yield: "45",
							               month: "7",
							               year: "2021", 
							               unit: "ounces"
							            }]
					        },{
							          id: "tomato_2",
							          title: "",
							          species: "tomato",
							          family: "solanacea",
							          variety: "willie's garden",
							          location: {
									               x: 283,
									               y: 144,
									               plot: "raised_bed1"
									            },
			 				          status: {
									               "seed_started": true,
									               "transplanted": true,
									               "harvested": true,
									               "failed": false,
									               "failed_reason": false
									            },
							          harvests: [{
									               yield: "45",
									               month: "7",
									               year: "2021", 
									               unit: "ounces"
									            }]
							        },
				]
  };

  const sortBy = field => {
      if (field=="species") {
          const reducer = (map, val) => {
	      var species = val.species
	      if (map[species] == null) {
		  map[species] = [0,0,0,0,0,0,0,0,0,0,0,0];
	      }
	      val.harvests.map(li => {
	          var month = parseInt(li.month,10)
		  map[species][month-1] += parseFloat(li.yield)
	      });
	      return map;
          };

	  const totals = designerModel.plants.reduce(reducer,{});
	  var newData = [];
	  for (var key in totals) {
	      newData.push({name: key, data: totals[key]});
          }
	  setChartData(newData);
      } else if (field=="family") {
          const reducer = (map, val) => {
  	      var family = val.family
	      if (map[family] == null) {
	          map[family] = [0,0,0,0,0,0,0,0,0,0,0,0];
	      }
	      val.harvests.map(li => {
                  var month = parseInt(li.month,10)
	          map[family][month-1] += parseFloat(li.yield)
	      });
	      return map;
          };

          const totals = designerModel.plants.reduce(reducer,{});
          var newData = [];
          for (var key in totals) {
	       newData.push({name: key, data: totals[key]});
          }
          setChartData(newData);
      } else if (field=="location") {
          const reducer = (map, val) => {
	      var plot = val.location.plot
	      if (map[plot] == null) {
                  map[plot] = [0,0,0,0,0,0,0,0,0,0,0,0];
	      }
              val.harvests.map(li => {
	          var month = parseInt(li.month,10)
	          map[plot][month-1] += parseFloat(li.yield)
              });
              return map;
	  };
	
	  const totals = designerModel.plants.reduce(reducer,{});
	  var newData = [];
	  for (var key in totals) {
	      newData.push({name: key, data: totals[key]});
          }
	  setChartData(newData);
      }
  }

  const startDateChange = date => {
	  setstartDate(date)
	}

	  const endDateChange = date => {
		      setendDate(date)
		    }

	  // Function for Create Input Fields
	   function handleAddFields() {
	       const item1 = { name: "", file: "" }
	           setinputFields([...inputFields, item1])
	             }
	
               // Function for Remove Input Fields
	                 function handleRemoveFields(idx) {
	                     document.getElementById("nested" + idx).style.display = "none"
	                       }


	return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Garden Yields" />
          {/* Render Breadcrumbs */}
	<Row>
	   <Col lg={3}>
		<Card>
		   <CardTitle>Filter</CardTitle>
		   <CardBody>
		     Choose how you would like to sort and view the success of your garden design
	              <div className="form-check mb-3"><input className="form-check-input" type="radio"  onClick={() => {
			                                sortBy("species")
			                              }} name="exampleRadios" id="exampleRadios1" value="option1"/><label className="form-check-label" htmlFor="exampleRadios1">Plant Species</label></div>
		      <div className="form-check mb-3"><input className="form-check-input" type="radio"  onClick={() => {
				                                                          sortBy("family")
				                                                        }} name="exampleRadios" id="exampleRadios2" value="option2"/><label className="form-check-label" htmlFor="exampleRadios1">Plant Family</label></div>
                      <div className="form-check mb-3"><input className="form-check-input" type="radio"  onClick={() => {
		                                                                                               sortBy("location")
		                                                                                             }} name="exampleRadios" id="exampleRadios2" value="option3"/><label className="form-check-label" htmlFor="exampleRadios1">Plot/Location</label></div>
		   </CardBody>
		</Card>
	   </Col>
	   <Col lg={5}>
		 <ReactApexChart options={options} series={chartData} type="bar" height={400} />
	   </Col>
	</Row>
          
        </Container>
      </div>
    </React.Fragment>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array,
  onGetTasks: PropTypes.func,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
})

const mapDispatchToProps = dispatch => ({
  onGetTasks: () => dispatch(getTasks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList))
