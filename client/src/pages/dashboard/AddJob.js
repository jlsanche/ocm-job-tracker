import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import AsyncSelect from "react-select/async";

import { HANDLE_CHANGE } from "../../context/actions";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    getClientList,
    client,
    dispatch

  } = useAppContext();


  // const handleSearch = (e) => {
    
  //   //if (isLoading) return;
  //   handleChange({ name: e.target.name, value: e.target.value });
  // };

  // const handleInputChange = (e) => { 
  //   // console.log('e ' ,e)
  //   // console.log('dispatch', dispatch)
  //   // //if (isLoading) return;
    
  //   // dispatch({ type: HANDLE_CHANGE, payload: { value: e } });
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   handleChange({ name, value });

  // }

  

  // const loadOptions = () => {

  //  getClientList()

  //  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobType) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
         {/* <h3>Choose Client</h3>
       <AsyncSelect
          cacheOptions
          defaultOptions
          type="text"
          name="searchClient"
          value={client ||" " }
          loadOptions={loadOptions}
          handleChange={handleSearch}
          onInputChange={handleInputChange}
        
        />
        {} */}

      
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* search client */}

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>

            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
