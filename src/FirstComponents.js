import React,{PureComponent} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

export class FirstComponents extends PureComponent{

    
constructor(props) {
    super(props)

    this.state = {
         offset:0,
         tableData:[],
         orgtableData:[],
         perPage:3,
         currentPage:0
    }

    this.handlePageClick=this.handlePageClick.bind(this);
}

    handlePageClick =(e)=>{
        const selectPage=e.selected;
        const offset = selectPage*this.state.perPage;

        this.setState({
            currentPage:selectPage,
            offset:offset
        },()=>{
            this.loadMoreData()
        }
        );
    };

    loadMoreData(){
        const data =this.state.orgtableData;
        const slice =data.slice(this.state.offset,this.state.offset+this.state.perPage)
        this.setState({
            pageCount:Math.ceil(data.length/this.state.perPage),
            tableData:slice
        })

    }

     componentDidMount(){
       this.getData()
     }
    getData(){
        axios
        .get(`https://restcountries.eu/rest/v2/all`)
        
        .then(res=>{
            var data= res.data;
            console.log(data)
            var slice=data.slice(this.state.offset,this.state.offset+this.state.perPage);

            this.setState({
                pageCount:Math.ceil(data.length/this.state.perPage),
                orgtableData:res.data,
                tableData:slice
            })
            
        })
    }

    render(){
        return(
        <div>
             <h1>COUNTRIES</h1>
             <table  border="1" >
                 <thead>
                     <th>NAME</th>
                     <th>CAPITAL</th>
                     <th>LANGUAGES</th>
                     <th>FLAG</th>
                 </thead>
                 <tbody>
                     {
                         this.state.tableData.map((tdata,i)=>(
                             <tr i={tdata.name}>
                                 <td>{tdata.name}</td>
                                 <td>{tdata.capital}</td>
                                 {/* <td>{tdata.languages.map((lang,k1)=>{
                    return(<p key={k1}>{lang.name}</p>)
                  })}                </td> */}
                   
                                 <td>{tdata.languages[0].name}</td>
                                 <td><img alt="Flag"src={tdata.flag} width="200"></img></td>
                             </tr>
                         ))
                     }
                 </tbody>
             </table>

             <ReactPaginate
             previousLabel={"prev"}
             nextLabel={"next"}
             breakLabel={"..."}
             breakClassName={"break-me"}
             pageCount={this.state.pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={this.handlePageClick}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"}           
             />
        </div>
        )
    }
}
export default FirstComponents