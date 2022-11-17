const VerifyAdmin = async () => {
    const token = localStorage.getItem("token");

    if(!token){
      return false
    }

    const isValid = await fetch(`${global.config.ROOT_URL}verify`, {
      method: "POST",
      body: JSON.stringify({
        admin: true,
      }),
      headers: {
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
    return isValid;
  };

  export default VerifyAdmin;