import axios from 'axios';

interface IAccessTokenResponse {
  access_token: String,

}

interface IUserResponse {
  avatar_url: String,
  login: String,
  id: Number,
  name: String
}

class AuthenticateUserService {
  async execute(code: String) {
    const url = 'https://github.com/login/oauth/access_token'

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },

      headers: {
        "Accept" : "application/json"
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}` 
      }
    });

    const { login, id, avatar_url, name } = response.data;

    return response.data;
  };
};

export { AuthenticateUserService };

