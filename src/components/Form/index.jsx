import { useEffect, useState } from 'react';

import styles from './Form.module.css';

const Form = () => {
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const [imc, setImc] = useState(0);
    const [nivelImc, setNivelImc] = useState('');
    const [resultado, setResultado] = useState(false);
    const [estiloResultado, setEstiloResultado] = useState('');

    const calcImc = () => {
        const calculo = (peso / (altura * altura));
        setImc(calculo);
        setResultado(true);
    }

    useEffect(() => {
        if (imc > 40) {
            setNivelImc("Obesidade Grau III");
        }
        else if (imc > 35) {
            setNivelImc("Obesidade Grau II");
        }
        else if (imc > 30) {
            setNivelImc("Obesidade Grau I");
        }
        else if (imc > 25) {
            setNivelImc("Sobrepeso");
        }
        else if (imc > 18.5) {
            setNivelImc("Normal");
        }
        else if (imc > 0 && imc <= 18.5) {
            setNivelImc("Magreza");
        }
    }, [imc])

    useEffect(() => {
        switch(nivelImc){
            case 'Obesidade Grau III':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoObesidade3}`)
                break;
            case 'Obesidade Grau II':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoObesidade2}`)
                break;
            case 'Obesidade Grau I':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoObesidade1}`)
                break;
            case 'Sobrepeso':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoSobrepeso}`)
                break;
            case 'Normal':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoNormal}`)
                break;
            case 'Magreza':
                setEstiloResultado(`${styles.resultado} ${styles.resultadoMagreza}`)
                break;
            default:
                setEstiloResultado(`${styles.resultado}`);
                break;
        }
    }, [nivelImc])

    return (
        <div className='container'>
            <h1 className={styles.title}>Calculadora IMC</h1>
            <form className={styles.form}>
                <label className={styles.formLabel} htmlFor="">Altura (M)</label>
                <input
                    onBlur={e => setAltura(e.target.value)}
                    className={styles.formInput}
                    type="number"
                    placeholder='Ex: 1.85'
                    min={0}
                />
                <label className={styles.formLabel} htmlFor="">Peso (KG)</label>
                <input
                    onBlur={e => setPeso(e.target.value)}
                    className={styles.formInput}
                    type="number"
                    placeholder='Ex: 65.9'
                    min={0}
                />
                <button
                    onClick={calcImc}
                    className={styles.formButton}
                    type="button"
                >
                    Calcular
                </button>
            </form>

            {resultado && (
                <div className={estiloResultado}>
                    <h4 className={styles.resultadoTexto}>Seu IMC é: {imc.toFixed(2)}</h4>
                    <h4>{nivelImc}</h4>
                </div>
            )}
        </div>
    )
}

export default Form;