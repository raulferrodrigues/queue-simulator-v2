Implementação do algoritmo de simulação (filas em tandem)

O passo seguinte para se criar um simulador de uma rede de filas é iniciar com filas em tandem, ou seja, a entrada de uma fila é a saída da "anterior".

Para esta entrega, você deve aprimorar o seu próprio simulador de fila. O funcionamento do simulador deve se basear nos conceitos apresentados anteriormente (geração de números pseudo-aleatórios e algoritmo de simulação). 

A sintaxe da entrada do seu simulador fica a seu critério. Para fins de facilidade, utilize algo bem simples, onde você informa apenas de alguma forma:

- o intervalo de tempo para a chegada de clientes na fila;

- o intervalo de tempo de atendimento de um cliente na fila;

- número de servidores;

- capacidade da fila.

É importante nesta etapa você já definir de alguma forma como é a sintaxe para determinar a rede de filas, ou seja, como você irá definir as probabilidades de roteamento de uma fila para outra.

Lembre-se, esta é a segunda etapa referente ao primeiro trabalho da disciplina. Ao final deste trabalho, seu simulador deve estar apto a modelar qualquer tipo de topologia de uma rede de filas, onde as filas podem ter diferentes características. Em sendo assim, já organize esta etapa de forma que você possa estender seu projeto para suportar não mais filas em tandem, mas sim uma rede de filas!

Você pode desenvolver seu simulador na linguagem que achar mais apropriada. Só não esqueça que o simulador entregue poderá ser executado pelo professor em um outro ambiente que não o que você desenvolveu. Fique atento para estes detalhes. Lembre-se também que o professor não saberá como funciona o seu simulador. Desta forma, você também deve fornecer as instruções de uso para que seja possível testar seu simulador. Para fins de teste, está disponível no Moodle um simulador de rede de filas o qual você pode comparar os resultados.

Para fins de validação, além do seu código-fonte, você também deve entregar o resultado da simulação da seguinte rede de filas:

    Fila 1 - G/G/2/3, chegadas entre 2..3, atendimento entre 2..5
    Fila 2 - G/G/1/3, atendimento entre 3..5

Note que a Fila 2 não possui chegadas de clientes do exterior da rede. A Fila 2 recebe 100% dos clientes que passam pela Fila 1, ou seja, as Filas 1 e 2 estão em linha onde os clientes chegam do exterior na Fila 1 e posteriormente vão para a Fila 2, indo embora do sistema após atendimento da Fila 2.

Para a simulação, considere inicialmente as filas vazias e o primeiro cliente chega no tempo 2,5. O resultado da sua simulação deve ser a média de 5 execuções (utilizando diferentes sementes de geração dos números pseudo-aleatórios, obviamente) com 100.000 aleatórios utilizados para cada uma destas simulações. Ou seja, ao se utilizar o 100.000 aleatório, sua simulação deve se encerrar.

Em caso de dúvida, revisite o material de apoio sobre estes conceitos.