const VerifyAdmin = async () => {
    const token = localStorage.getItem("token");
    const isvalid = await fetch("http://localhost:5050/api/admin/verify", {
      method: "POST",
      body: JSON.stringify({
        admin: true,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.valid;
      })
      .catch((error) => {
        return error;
      });
    return isvalid;
  };

  export default VerifyAdmin;