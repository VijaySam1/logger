import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config(
  {
    path: path.join(__dirname, "../../.env"),
  },
);

const ENV_VARS={
  db:{
    url:process.env.MONGO_URL ??'',
  },
};
export default ENV_VARS;