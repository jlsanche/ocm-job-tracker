import { useAppContext } from "../context/appContext";
import AsyncSelect from "react-select/async";

import React from "react";
import Wrapper from "../assets/wrappers/Job";

const ClientContainer = () => {
  const { isLoading, searchClient, handleChange } = useAppContext;

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Choose Client</h3>
        {}
        <AsyncSelect
          cacheOptions
          defaultOptions
          type="text"
          name="searchClient"
          value={searchClient}
          handleChange={handleSearch}
        />
        {}

        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            select
          </button>
        </div>
      </form>

      {}
    </Wrapper>
  );
};
export default ClientContainer;
