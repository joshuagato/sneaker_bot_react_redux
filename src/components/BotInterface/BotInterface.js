import React, { Component } from 'react';
import './BotInterface.scss';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';

import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrashAlt, faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';

class BotInterface extends Component {

  state = {
    productinfo: {
      user: '',
      productsite: '0',
      productname: '',
      productnumber: '',
      productsize: '0',
      productquantity: '',
      profile: '0',
      status: 'Ready'
    },
    createTaskDisabled: true,
    profileinfo: {},
    sizes: [
      '4', '4.0', '04.0', 'M 4 / W 5', '4.5', '04.5', 'M 4.5 / W 5.5', '5', '5.0', '05.0', 'M 5 / W 6',
      '5.5', '05.5', 'M 5.5 / W 6.5', '6', '6.0', '06.0', 'M 6 / W 7', '6.5', '06.5', 'M 6.5 / W 7.5',
      '7', '7.0', '07.0', 'M 7 / W 7.5', '7.5', '07.5', 'M 7.5 / W 8.5', '8', '8.0', '08.5', 'M 8 / W 9',
      '8.5', '08.5', 'M 8.5 / W 9.5', '9', '9.0', '09.0', 'M 9 / W 10', '9.5', '09.5', 'M 9.5 / W 10.5',
      '10', '10.0', 'M 10 / W 11', '10.5', 'M 10.5 / W 11.5', '11', '11.0', 'M 11 / W 12', '11.5', 'M 11.5 / W 12.5',
      '12', '12.0', 'M 12 / W 13', '12.5', 'M 12.5 / W 13.5', '13', '13.0', 'M 13 / W 14', '13.5', 'M 13.5 / W 13.5',
      '14', '14.0', 'M 14 / W 15', '14.5', 'M 14.5 / W 15.5', '15', '15.0', 'M 15 / W 16', '15.5', 'M 15.5 / W 16.5',
      '16', '16.0', 'M 16 / W 17', '16.5', 'M 16.5 / W 17.5', '17', '17.0', 'M 17 / W 18', '17.5', 'M 17.5 / W 18.5',
      '18', '18.0', 'M 18 / W 19'
    ],
    sites: ['adidas', 'eastbay', 'footlocker', 'champs']
  }

  inputHandler = event => {
    const updatedProductInfo = { ...this.state.productinfo };
    updatedProductInfo[event.target.name] = event.target.value
    this.setState({ productinfo: updatedProductInfo });
  }

  submitForm = event => {
    event.preventDefault();
    this.props.onAddTask(this.state.productinfo);
  }

  purchase = (productDetails, userDetails, taskId) => {
    const {user, prod_name, prod_number, prod_qty, prod_size} = productDetails;
    const details = {...userDetails, user, prod_number, prod_name, prod_qty, prod_size, taskId};

    if (productDetails.website === 'adidas') {
      this.props.onPurchaseAdidas(details);
    } else if (productDetails.website === 'eastbay') {
      this.props.onPurchaseEastbay(details);
    } else if (productDetails.website === 'footlocker') {
      this.props.onPurchaseFootlocker(details);
    } else if (productDetails.website === 'champs') {
      this.props.onPurchaseChampssports(details);
    }
  }

  deleteTask = productId => {
    swal({
      title: "Are you sure?", text: "Once deleted, you will not be able to recover this task",
      icon: "warning", buttons: true, dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) this.props.onDeleteTask(productId, this.props.user.id);        
    });
  }

  fetchProfile = id => {
    return this.props.profiles.find(profile => parseInt(profile.id) === parseInt(id));
  }

  profileHandler = event => {
    const profileId = event.target.value;
    const profileinfo = this.fetchProfile(profileId);
    this.setState({ profileId, profileinfo });
  }

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  }

  setUser = () => {
    const updatedProductInfo = { ...this.state.productinfo };
    updatedProductInfo['user'] = this.props.user.id
    this.setState({ productinfo: updatedProductInfo });
  }

  getProfileName = id => {
    const matchedProfile = this.props.profiles.find(profile => parseInt(profile.id)  === parseInt(id));
    return matchedProfile.profile_name;
  }

  getProfileData = id => {
    return this.props.profiles.find(profile => parseInt(profile.id) === parseInt(id));
  }

  logout = () => {
    if (this.props.onLogout()) this.props.history.replace('/');
  }

  componentDidMount() {
    this.props.onFetchAllProfiles(this.props.user.id);
    this.props.onFetchAllTasks(this.props.user.id);
    this.setUser();
  }

  componentDidUpdate(prevProps, prevState, _) {
    const i = this.state.productinfo;
    const p = prevState.productinfo;

    if (p.productsite !== i.productsite || p.productname !== i.productname || 
      p.productsize !== i.productsize || p.productquantity !== i.productquantity ||
      p.profile !== i.profile) {
        
      if (i.productsite && i.productsite !== "0" && i.productname && i.productnumber && 
        i.productquantity && parseInt(i.productquantity) >= 1 && parseInt(i.profile) >= 1)
          this.setState({ createTaskDisabled: false });

      else this.setState({ createTaskDisabled: true });
    }

    if (this.props.tasks.length !== prevProps.tasks.length) this.props.onFetchAllTasks(this.props.user.id);
  }

  render() {
    const prod = this.state.productinfo;
    const sizes = this.state.sizes;
    const sites = this.state.sites;

    return (
      <div className="bot-interface">
        <div id="bot">
          <section id="controls">
            <fieldset className="moveFromTop">
              <legend>Product Info</legend>
              <form onSubmit={this.submitForm}>
                <label>Target Website
                  <select value={this.state.productsite} onChange={this.inputHandler} name="productsite">
                    <option value="0">Select a website</option>
                    {sites.map((site, index) => <option key={index} value={site}>{site.charAt(0).toUpperCase() + site.slice(1)}</option>)}
                  </select>
                </label>
                <label>Product Name <input type="text" placeholder="Product Name" onChange={this.inputHandler} 
                  value={prod.productname} name="productname" />
                </label>
                <label>Product Number <input type="text" placeholder="Product Number" onChange={this.inputHandler} 
                  value={prod.productnumber} name="productnumber" />
                </label>
                <label>Product Size
                  <select value={prod.productsize} onChange={this.inputHandler} name="productsize">
                    <option value="0">Please select size</option>
                    {sizes.map((size, index) => <option key={index} value={size}>Size {size}</option>)}
                  </select>
                </label>
                <label>Product Quantity<input type="number" placeholder="Product Number" onChange={this.inputHandler} 
                  value={prod.productquantity} name="productquantity" />
                </label>
                <label>User Profile
                  <select value={prod.profile} onChange={this.inputHandler} name="profile">
                    <option value="0">Select a profile</option>
                    {this.props.profiles.map(profile => (
                      <option value={profile.id} key={profile.id}>{profile.profile_name}</option>
                    ))}
                  </select>
                </label>
                <button id="create-task" type="submit" disabled={this.state.createTaskDisabled}>CREATE TASK</button>
              </form>
            </fieldset>

            <fieldset className="moveFromBottom">
              <legend>User Info</legend>
              <form>
                <label>User Profile
                  <select>
                    <option value="0">Select a profile to edit</option>
                    {this.props.profiles.map(profile => (
                      <option value={profile.id} key={profile.id}>{profile.profile_name}</option>
                    ))}
                  </select>
                </label>
                <button className="profile-btn" type="button">EDIT</button>
                <button className="profile-btn" type="button">NEW</button>
              </form>
            </fieldset>
          </section>
          <section id="tasks">
            <section id="fixed-section">
              <div className="headings">
                <span className="prod-id">ID</span><span className="size">SIZE</span>
                <span className="site">WEBSITE</span><span className="profile">PROFILE</span>
                <span className="status">STATUS</span><span className="action">ACTION</span>
              </div>
              <hr />
            </section>
            <section id="padding-section"></section>
            {this.props.tasks.map(task => (
              <div key={task.id} className="task-items">
                <span className="prod-id">{task.prod_number}</span><span className="size">{task.prod_size}</span>
                <span className="site">{task.website}</span><span className="profile">
                  {this.getProfileName(task.profile)}</span>
                <span className="status">{task.status}</span>
                <span className="action">
                  {task.status === 'Ordered' &&
                    <React.Fragment>
                    <span id="checked"><FontAwesomeIcon icon={faCheck} /></span>
                    <span className="delete" onClick={this.deleteTask.bind(this, task.id)} title="Delete">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </span></React.Fragment>}
                  {task.status === 'Ready' &&
                  <React.Fragment>
                    <span id="start" onClick={() => this.purchase(task, this.getProfileData(task.profile), task.id)} title="Purchase">
                      <FontAwesomeIcon icon={faPlay} />
                    </span>
                    <span id="edit" title="Edit">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                    <span id="delete" onClick={this.deleteTask.bind(this, task.id)} title="Delete">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                  </React.Fragment>}
                  {task.status === 'Loading' &&
                  <Loader type="Bars" color="#00BFFF" height={15} width={100} timeout={900000} />}
                </span>
              </div>
            ))}
          </section>
          <section id="user-specific-data">
            <div className="username">{this.props.user.firstname}</div>
            <button onClick={this.logout} className="logout">Logout</button>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasksReducer.tasks,
    failureMessage: state.tasksReducer.failureMessage,
    profiles: state.profilesReducer.profiles,
    user: state.loginReducer.user,
    loading: state.tasksReducer.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: data => dispatch(actions.addTask(data)),
    onFetchAllTasks: id => dispatch(actions.fetchAllTasks(id)),
    onDeleteTask: (prodid, userid) => dispatch(actions.deleteTask(prodid, userid)),
    onPurchaseAdidas: details => dispatch(actions.purchaseAdidas(details)),
    onPurchaseEastbay: details => dispatch(actions.purchaseEastbay(details)),
    onPurchaseFootlocker: details => dispatch(actions.purchaseFootlocker(details)),
    onPurchaseChampssports: details => dispatch(actions.purchaseChampssports(details)),
    onFetchAllProfiles: id => dispatch(actions.fetchAllProfiles(id)),
    onLogout: () => dispatch(actions.logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BotInterface);
