import patientService from "../../services/patientService";
import { Input } from "antd";


function SearchButton({page, size, setPatients, setFilterWord, setPage, setTotal}) {

  return (
    <>
    <Input
      autoFocus
      size="middle"
      placeholder = 'Type to find patient data'
      onChange = {(e) => {
        setFilterWord(e.target.value)
        patientService
        .getAll(page, size, e.target.value)
        .then(patients => {
          setPatients(patients.patients)
          setPage(patients.page)
          setTotal(patients.total)
        })
      }}/>
    </>
  )
}

export default SearchButton