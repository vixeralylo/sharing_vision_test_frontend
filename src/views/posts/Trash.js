import React from 'react'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const url = window.location.href;
const flag = url.substring(url.lastIndexOf('/') + 1)

class AllPost extends React.Component {
  constructor(){
    super();
    this.state = {
      articleList: [],
    };
  }

  async componentDidMount() {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:3000/article/10/0'
    };
    let self = this;
    await axios(config)
    .then(function (response) {
      self.setState({articleList: response.data.results});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeItem = (id, title, content, category) => {
    var axios = require('axios');
    let self = this;
    var data = JSON.stringify({
      "title": title,
      "content": content,
      "category": category,
      "status": 'TRASH'
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/article/'+id,
      headers: {
          'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
        window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>All Posts</strong>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="components/table">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                    this.state.articleList.map((article,index) => (
                      article.Status === 'TRASH' &&
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                        <CTableDataCell>{article.Title}</CTableDataCell>
                        <CTableDataCell>{article.Category}</CTableDataCell>
                        <CTableDataCell>
                          <a href={global.baseUrl+"#/posts/edit/"+article.Id}><BsFillPencilFill /></a>&nbsp;&nbsp;
                          <a onClick={()=>this.removeItem(article.Id, article.Title, article.Content, article.Category)}><BsFillTrashFill /></a>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                    }
                  </CTableBody>
                </CTable>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default AllPost
