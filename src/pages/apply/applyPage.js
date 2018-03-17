import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

import { provinces, cities, hospitals } from '../../util/hospitals'

import './apply.css'

const applySelectHospital = {
  "width": "30%",
  "marginRight": "5%"
}

class ApplyPage extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.changeApplyMoneyNum = this.changeApplyMoneyNum.bind(this)
    this.createSelectProvincesMenus = this.createSelectProvincesMenus.bind(this)
    this.createSelectCitiesMenus = this.createSelectCitiesMenus.bind(this)
    this.createSelectHospitalsMenus = this.createSelectHospitalsMenus.bind(this)
    this.handleChangeSelectProvince = this.handleChangeSelectProvince.bind(this)
    this.handleChangeSelectCity = this.handleChangeSelectCity.bind(this)
    this.handleChangeSelectHospital = this.handleChangeSelectHospital.bind(this)
    this.submitApply = this.submitApply.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeGentle = this.handleChangeGentle.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeReason = this.handleChangeReason.bind(this)
    this.handleChangeHospitalAddress = this.handleChangeHospitalAddress.bind(this)

    this.state = {
      name: '',
      phone: '',
      gentle: '',
      applyMoneyNum: 30,
      selectHospital: {
        province: undefined,
        city: undefined,
        hospital: undefined
      },
      hospitalAddress: '',
      reason: ''
    }
  }

  changeApplyMoneyNum (event, value) {
    this.setState({
      ...this.state,
      applyMoneyNum: value
    })
  }

  createSelectProvincesMenus() {
    const provinceItems = provinces.map((province, index) => {
      return <MenuItem key={"province" + index} value={province.id} primaryText={province.name} />
    })
    return (
      <SelectField
        floatingLabelText="省份"
        value={this.state.selectHospital.province}
        onChange={this.handleChangeSelectProvince}
        style={applySelectHospital}
        autoWidth={true}
      >
        {provinceItems}
      </SelectField>
    )
  }

  createSelectCitiesMenus(provinceId) {
    let cityItems, citys
    if (provinceId) {
      citys = cities.filter(city => {
        return city.provinceId === provinceId
      })
    } else {
      citys = cities
    }
    cityItems = citys.map((city, index) => {
      return <MenuItem key={"city" + index} value={city.id} primaryText={city.name} />
    })
    return (
      <SelectField
        floatingLabelText="城市"
        value={this.state.selectHospital.city}
        onChange={this.handleChangeSelectCity}
        style={applySelectHospital}
        autoWidth={true}
      >
        {cityItems}
      </SelectField>
    )
  }

  createSelectHospitalsMenus(cityId) {
    let hospitalItems, hospitals_
    if (cityId) {
      hospitals_ = hospitals.filter(hospital => {
        return hospital.cityId === cityId
      })
    } else {
      hospitals_ = hospitals
    }
    hospitalItems = hospitals_.map((hospital, index) => {
      return <MenuItem key={"hospital" + index} value={hospital.id} primaryText={hospital.name} />
    })
    return (
      <SelectField
        floatingLabelText="医院"
        value={this.state.selectHospital.hospital}
        onChange={this.handleChangeSelectHospital}
        style={{width: "30%"}}
        autoWidth={true}
      >
        {hospitalItems}
      </SelectField>
    )
  }
  
  handleChangeSelectProvince(event, index, value) {
    this.setState({
      ...this.state,
      selectHospital: {
        ...this.state.selectHospital,
        province: value
      }
    })
  }

  handleChangeSelectCity(event, index, value) {
    this.setState({
      ...this.state,
      selectHospital: {
        ...this.state.selectHospital,
        city: value
      }
    })
  }

  handleChangeSelectHospital(event, index, value) {
    this.setState({
      ...this.state,
      selectHospital: {
        ...this.state.selectHospital,
        hospital: value
      }
    })
  }

  handleChangeName(event, value) {
    this.setState({
      ...this.state,
      name: value
    })
  }

  handleChangePhone(event, value) {
    this.setState({
      ...this.state,
      phone: value
    })
  }

  handleChangeGentle(event, value) {
    this.setState({
      ...this.state,
      gentle: value
    })
  }

  handleChangeReason(event, value) {
    this.setState({
      ...this.state,
      reason: value
    })
  }

  handleChangeHospitalAddress(event, value) {
    this.setState({
      ...this.state,
      hospitalAddress: value
    })
  }

  submitApply() {
    const ownerName = this.state.name
    const hospitalAddress = this.state.hospitalAddress
    const donateMount = this.state.applyMoneyNum * 10
    const promise = this.contracts.GivenFactory.methods.newGiven(ownerName, hospitalAddress, donateMount).call()
    promise.then((result) => {
      this.props.router.push('/detail?address=' + result)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <main className="container">
        <h2>申请详情</h2>
        <TextField
          name="name"
          floatingLabelText="姓名"
          fullWidth={true}
          value={this.state.name}
          onChange={this.handleChangeName}
        /> <br />
        <TextField
          name="mobile"
          floatingLabelText="联系电话"
          fullWidth={true}
          value={this.state.phone}
          onChange={this.handleChangePhone}
        /> <br />
        <TextField
          name="gentle"
          floatingLabelText="性别"
          fullWidth={true}
          value={this.state.gentle}
          onChange={this.handleChangeGentle}
        /> <br /><br />
        <label className="apply-field-label">申请金额 {this.state.applyMoneyNum} 万元</label>
        <Slider
          step={10}
          value={this.state.applyMoneyNum}
          min={0}
          max={100}
          className="apply-slider"
          sliderStyle={{
            "marginTop": "10px",
            "marginBottom": "0"
          }}
          onChange={this.changeApplyMoneyNum}
        />
        <br />
        <label className="apply-field-label">执行医院</label><br />
        {this.createSelectProvincesMenus()}
        {this.createSelectCitiesMenus(this.state.selectHospital.province)}
        {this.createSelectHospitalsMenus(this.state.selectHospital.city)}
        <TextField
          name="医院的数字地址"
          floatingLabelText="医院的数字地址"
          fullWidth={true}
          value={this.state.hospitalAddress}
          onChange={this.handleChangeHospitalAddress}
        /> <br />
        <TextField
          name="reason"
          floatingLabelText="申请原因"
          fullWidth={true}
          rows={3}
          multiLine={true}
          value={this.state.reason}
          onChange={this.handleChangeReason}
        />
        <RaisedButton label="提交申请" primary={true} className="apply-submit-button" onClick={this.submitApply} />
      </main>
    )
  }
}

ApplyPage.contextTypes = {
  drizzle: PropTypes.object
}

export default ApplyPage
