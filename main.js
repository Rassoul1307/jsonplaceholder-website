async function getTodos() {
    try {
      const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
      const response = await fetch(apiUrl);
      const data = await response.json();
      const todoList = document.getElementById('todoList');
      const completedTodoList = document.getElementById('completedTodoList');
      const btnNodif = document.querySelector('.notifs')
      const completedTodos = []; // Tableau pour stocker les tâches terminées
      const nbrTodoCompleted = document.querySelector('.nbrTodoCompleted')

      //   console.log(btnNodif);
      btnNodif.addEventListener('click', ()=>{
        const tacheTermine = document.querySelector('.tacheTermine')
        tacheTermine.classList.toggle('showTacheTerminer')
        // console.log(tacheTermine);
      })
  
      data.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title;
        listItem.addEventListener('click', () => {
          // Afficher les détails du todo lorsque vous cliquez sur le todo
          displayTodoDetails(todo,listItem);
          });
  
        const finishButton = document.createElement('button');
        finishButton.textContent = 'Terminer';
  
        finishButton.addEventListener('click', () => {
          listItem.remove();
          todoList.insertBefore(listItem, todoList.firstChild);
          if (finishButton.textContent === 'Terminer') {
            completedTodos.push(todo); // Ajouter au tableau des tâches terminées
            finishButton.textContent = 'Non Terminer';
          } else {
            // Retirer du tableau des tâches terminées
            const index = completedTodos.findIndex(item => item.id === todo.id);
            if (index > -1) {
              completedTodos.splice(index, 1);
            }
            finishButton.textContent = 'Terminer';
          }
          // Déplacer le todo vers la section "Todos terminés"
          completedTodoList.appendChild(listItem);
          finishButton.textContent = 'Non Terminer';
          finishButton.addEventListener('click',()=>{
            listItem.remove()
            todoList.appendChild(listItem);
            finishButton.textContent = 'Terminer';
          })
          nbrTodoCompleted.textContent = completedTodos.length

        });
  
        listItem.appendChild(finishButton);
  
        if (!todo.completed) {
          todoList.appendChild(listItem);
        }
      });

      function displayTodoDetails(todo, listItem) {
        // Créer une bulle flottante pour les détails du todo
        const detailsBubble = document.createElement('div');
        detailsBubble.className = 'todo-details-bubble';
        detailsBubble.innerHTML = `
          <h3>Détails du Todo</h3>
          <p>ID: ${todo.id}</p>
          <p>Title: ${todo.title}</p>
          <p>Completed: ${todo.completed ? 'Oui' : 'Non'}</p>
        `;
  
        // Positionner la bulle flottante en fonction du todo cliqué
        const listItemRect = listItem.getBoundingClientRect();
        detailsBubble.style.top = (listItemRect.bottom + window.scrollY) + 'px';
        detailsBubble.style.left = (listItemRect.left + window.scrollX) + 'px';
  
        // Ajouter la bulle flottante à la page
        document.body.appendChild(detailsBubble);
  
        // Gérer la fermeture de la bulle flottante en cliquant en dehors
        document.body.addEventListener('click', (e) => {
          if (e.target !== listItem && e.target !== detailsBubble) {
            detailsBubble.remove();
          }
        });
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des todos : ', error);
    }
  }
  
  getTodos();
  