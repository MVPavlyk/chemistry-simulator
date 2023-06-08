import { axiosServices } from './axios.services';

import { urls } from '../config/urls';

export const ReservoirsServices = {
  getAll: () => axiosServices.get(urls.getAll).then(value => value.data).catch(e => console.log(e)),
  create: (data) => axiosServices.post(urls.create, data).then(value => value.data).catch(e => console.log(e)),
  update: (data) => axiosServices.put(urls.update, data).then(value => value.data).catch(e => console.log(e)),
  info: (id) => axiosServices.get(urls.info + '?id=' + id).then(value => value.data).catch(e => console.log(e)),
  getById: (id) => axiosServices.get(urls.getById + '/' + id).then(value => value.data).catch(e => console.log(e)),
  delete: (id) => axiosServices.delete(urls.delete + '/' + id).then(value => value.data).catch(e => console.log(e)),
};
