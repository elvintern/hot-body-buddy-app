const fetchUserInfoById = async (userId) => {
  const response = await fetch('http://localhost:9000/api/v1/user/profile', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export default fetchUserInfoById;
