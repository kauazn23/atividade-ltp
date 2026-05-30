class CadastroError extends Error {
    constructor(mensagem, campos) {
        super(mensagem)
        this.name = "CadastroError"
        this.campos = campos
    }
}
function validarCadastro(dados) {
    const erros = []
    if (!dados.nome || dados.nome.trim() === ""){
        erros.push({
            campo: "nome",
            mensagem: "Nome é obrigatório"
        })
    } else if (dados.nome.trim().length < 3){
        erros.push({
            campo: "nome",
            mensagem: "Nome deve ter no mínimo 3 caracteres"
        })
    }
    if (!dados.email || dados.email.trim() === ""){
        erros.push({
            campo: "email",
            mensagem: "Email é obrigatório"
        });
    } else if (!dados.email.includes("@")){
        erros.push({
            campo: "email",
            mensagem: "Email inválido"
        })
    }
    if (!dados.senha){
        erros.push({
            campo: "senha",
            mensagem: "Senha é obrigatória"
        })
    } else if (dados.senha.length < 6){
        erros.push({
            campo: "senha",
            mensagem: "Senha deve ter no mínimo 6 caracteres"
        })
    }
    if (dados.idade === undefined || dados.idade === null){
        erros.push({
            campo: "idade",
            mensagem: "Idade é obrigatória"
        })
    } else if (dados.idade < 18){
        erros.push({
            campo: "idade",
            mensagem: "Deve ter 18 anos ou mais"
        })
    }
    if (erros.length > 0){
        throw new CadastroError("Validação falhou", erros)
    }
    return true
}
function processarCadastro(dados){
    try{
        validarCadastro(dados)
        return{
            sucesso: true,
            dados: dados}
    } catch (erro){
        if (erro instanceof CadastroError){
            return{
                sucesso: false,
                erros: erro.campos
            }}
        return {
            sucesso: false,
            erros: [{
                campo: "sistema",
                mensagem: erro.message
            }]
        }}}
console.log(processarCadastro({
    nome: "João Silva",
    email: "joao@email.com",
    senha: "123456",
    idade: 20
}))
console.log(processarCadastro({
    nome: "Jo",
    email: "email-invalido",
    senha: "123",
    idade: 16
}))