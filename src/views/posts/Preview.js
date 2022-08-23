import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormCheck
} from '@coreui/react'
import { DocsExample } from 'src/components'

const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1)

class PreviewArticle extends React.Component {
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
  render(){
    return (
      <CRow>
        <CCol xs={12}>
          {
            this.state.articleList.map((article,index) => (
              <article key={index}>
              <h2>{article.Title}</h2>
              <p>{article.Content}</p>
              </article>
            ))
          }
        </CCol>
      </CRow>
    )
  }
}

export default PreviewArticle
