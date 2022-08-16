import {
    ref,
    query,
    orderByChild,
    onChildAdded,
    off,
    endAt,
    endBefore,
    equalTo,
    startAt,
    startAfter,
    onValue,
    limitToFirst,
    limitToLast
} from "firebase/database"

function getOrderByChild(order,db,callback){

    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(order))
    onChildAdded(consulta,callback)
}

function getFilterByChild(filter,value, db,callback){
    
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(filter), startAt(value))
    onChildAdded(consulta,callback)
}


function getMostExpensive(db,setValue,list){
    // implement aqui
    /**
     *     Nesta função é necessário implementar o callback,
     * pois será necessário ordenar os resultados no cliente
     * pelos produtos mais caros (reverso). É necessário chamar 
     * a função setValue() e o array list passados como parametro.
     * Para repassar os resultados do client React utiliza-se a função
     * setValue() com os parametros [...list], ou seja, setValue([...list])
     * onde em list deverá estar o array de produtos ordenados pelo preco
     * mais caro. Lembrando que list é um array, use os métodos para trabalhar
     * com arrays em JavaScript! Dica: usem reverse() ou unshift().
     * 
     *  */ 
    list = []
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'))

    onChildAdded(consulta,(snap)=>{
        list.unshift(snap.val()) // O QUE ADICIONAR AO ARRAY? O OBJETO INTEIRO?
        setValue([...list])
    })
    


}

function getMostCheap(db,callback){
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'))
    onChildAdded(consulta,callback)
}


function getPriceRange(value, db,callback){
    const rfDB = ref(db, 'produtos/');
    const consulta = query(rfDB, orderByChild('preco'), endAt(Number(value)))
    //console.log(value)
    onChildAdded(consulta,callback)
}

export {getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange}
