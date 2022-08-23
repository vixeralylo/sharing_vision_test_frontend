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

class EditArticle extends React.Component {
  constructor(){
    super();
    this.state = {
      articleDetail: [],
      title: '',
      content: '',
      category: '',
      status: '',
    };
  }

  async componentDidMount() {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:3000/article/'+id
    };
    let self = this;
    await axios(config)
    .then(function (response) {
      self.setState({articleDetail: response.data.results[0]})
      self.setState({title: response.data.results[0].Title});
      self.setState({content: response.data.results[0].Content});
      self.setState({category: response.data.results[0].Category});
      self.setState({status: response.data.results[0].Status});
    })
    .catch(function (error) {
        console.log(error)
    });
  }

  handleChangeTitle = event =>{
    this.setState({title: event.target.value});
  }

  handleChangeContent = event =>{
    this.setState({content: event.target.value});
  }

  handleChangeCategory = event =>{
    this.setState({category: event.target.value});
  }

  handleChangeStatus = event =>{
      const checkedArr = [];
      const checkeds = document.getElementsByName('radio_status');
      for (let i = 0; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
          checkedArr.push(checkeds[i].value);
          }
      }
      this.setState({ status: checkedArr});
  }

  SaveArticle = (id) => {
    var axios = require('axios');
    let self = this;
    var data = JSON.stringify({
      "title": this.state.title,
      "content": this.state.content,
      "category": this.state.category,
      "status": this.state.status
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
      if(response.data.status === 200){
        window.location = "/#/posts/all"
      }
      else{
        self.setState({ errMsg: response.data.error})
      }
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Article</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={this.state.articleDetail.Title}
                    onChange= {this.handleChangeTitle}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Content</CFormLabel>
                  <CFormTextarea onChange= {this.handleChangeContent} id="content" name="content" rows="7" defaultValue={this.state.articleDetail.Content}></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                  <CFormInput
                    type="text"
                    id="category"
                    name="category"
                    defaultValue={this.state.articleDetail.Category}
                    onChange= {this.handleChangeCategory}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                  <div className="form-check">
                      <input checked={this.state.status === 'PUBLISH' ? true : false} style={{fontSize:'12px',marginTop:'7px'}} onChange= {this.handleChangeStatus} className="form-check-input" type="radio" value="PUBLISH" name="radio_status"></input>
                      <label className="form-check-label" style={{fontSize:'14px'}}>PUBLISH</label>
                  </div>
                  <div className="form-check">
                      <input checked={this.state.status === 'DRAFT' ? true : false} style={{fontSize:'12px',marginTop:'7px'}} onChange= {this.handleChangeStatus} className="form-check-input" type="radio" value="DRAFT" name="radio_status"></input>
                      <label className="form-check-label" style={{fontSize:'14px'}}>DRAFT</label>
                  </div>
                  <div className="form-check">
                      <input checked={this.state.status === 'TRASH' ? true : false} style={{fontSize:'12px',marginTop:'7px'}} onChange= {this.handleChangeStatus} className="form-check-input" type="radio" value="TRASH" name="radio_status"></input>
                      <label className="form-check-label" style={{fontSize:'14px'}}>TRASH</label>
                  </div>
                </div>
                <div className="mb-3">
                  <p style={{color:'red'}}>{this.state.errMsg}</p>
                </div>
                <CCol xs>
                  <CButton href="#/posts/all" component="a" color="secondary" role="button">
                    Cancel
                  </CButton>&nbsp;&nbsp;
                  <CButton onClick={() => this.SaveArticle(this.state.articleDetail.Id)} component="a" color="primary" role="button">
                    Edit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default EditArticle
