import db from './initDb'

db.transaction(tx => {

   
    tx.executeSql(

        "CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo_barras TEXT, criado_em TEXT);"

    )

    
    
})

const persist = (obj) => {

    return new Promise((resolve, reject) => {

        db.transaction(

            transAction => {

                transAction.executeSql("INSERT INTO registros (codigo_barras, criado_em) VALUES (?,?);", [obj.codigo_barras, new Date().toString()],

                    (_, { rowsAffected, insertId }) => {

                        if (rowsAffected > 0)
                            resolve(insertId);
                        else
                            reject(`Erro ao tentar salvar o registro ${JSON.stringify(obj.codigo_barras)}`)

                    },

                    (_, error) => reject(error)

                )

            }

        )

    })

}

const findAll = () => {

    return new Promise((resolve, reject) => {

        db.transaction(

            transAction => {

                transAction.executeSql("SELECT * FROM registros",[],

                    (_, { rows }) => {

                    resolve(rows._array);                      

                    },

                    (_, error) => reject(error)

                )

            }

        )

    })

}


export default {
    
    persist,

    findAll

};




