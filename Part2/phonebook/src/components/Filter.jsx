function Filter({ handleSearch }) {
  return (
    <>
      <h3>filter shown with:</h3>
      <input type="text" onChange={handleSearch} />
    </>
  );
}

export default Filter;
