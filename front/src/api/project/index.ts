import api from '..'

const getProjects = () => api.get('/project')
const createProject = (form: FormData) => api.post('/project', form)

export { getProjects, createProject }
