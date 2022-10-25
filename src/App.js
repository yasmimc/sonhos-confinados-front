import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const columns = [
  'sonho_id',
  'data_hora',
  'data',
  'concordo',
  'pseudonimo',
  'idade',
  'genero',
  'ocupacao',
  'raca',
  'local',
  'escolaridade',
  'relato_sonho',
  'dia_anterior',
  'associacao_livre',
  'interpretacao',
  'voce_diria',
  'sonhoantesdepois_pandemia',
  'tratamento_smental',
  'saude_pandemia',
  'contato_escuta',
  'pandemia_alterarotina',
  'palavras_pandemia',
  'servico_essencial',
  'filhos_pandemia',
  'cuidar_gruporisco',
  'tiveram_covid',
  'perdeu_alguem',
  'vacinado',
  'sustento_atual',
  'contou_sonho',
  'cidade_isolamento',
  'pandemia_afetarotina',
]

function createQuery(data){
  const queryColumns = columns.filter((column)=>data[column]).join(",")
  const query = `SELECT ${queryColumns} FROM sonhos`
  return query
}


function App() {
  const [result, setResult] = useState([]);
  function send(data) {
    const query = createQuery(data)
    console.log({ query });
    axios
      .get(`https://sonhos-confinados.herokuapp.com/?query=${query}`)
      .then((resp) => {
        console.log(resp.data);
        setResult(resp.data);
      })
      .catch((error) => console.log(error));
      return result;
  }
  const {getValues, register, handleSubmit} = useForm();
  console.log(getValues());
  //console.log(createQuery(data));
  
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit(send)}>
          {columns.map((column)=>(
            <div>
              <label
                for={column}>
                {column}
              </label>
          <input {...register(column)}  
            id={column}
            type="checkbox"/>
            </div>
          ))} 
          <input {...register("search")} 
            type="search"  
            placeholder={"digite sua query"} />
          <button type="submit">Enviar</button>
        </form>
         {result === "Query inválida"
          ? "Query inválida"
          : result.map((r, i) => (
              <div>
                <h3>Resultado Nº {i + 1}</h3>
                <ul>
                  {Object.keys(r).map((item) => (
                    <h6>
                      {item} : {r[item] ? r[item] : "Sem resposta"}
                    </h6>
                  ))}
                </ul>
              </div>
            ))}
      </header>
    </div>
  );
}

export default App;
