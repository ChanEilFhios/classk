
export const initModal = (modalElement) => {
    const crudModal = modalElement
    const form = crudModal.querySelector('form')
    const deleteBtn = crudModal.querySelector('#taskdelete')
    const saveBtn = crudModal.querySelector('#tasksave')

    const submitTrigger = (e) => form.requestSubmit(e.target)

    crudModal.addEventListener('show.bs.modal', (e) => {
        const trigger = e.relatedTarget //Which button triggered the modal.
        const taskId = trigger.getAttribute('data-classk-taskid')
        
        if (taskId) {
            //We're modifying
            loadTaskToModal(taskId)
        } else {
            //We're adding a new one.
            resetModal()
        }
    })

    form.addEventListener('submit', (e) => {
        const action = (e.submitter) ? e.submitter.getAttribute('data-classk-action') : 'save'
        const form = new FormData(e.target, e.submitter)

        console.log("action", action, "Form Data", formData)
    })
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.requestSubmit(saveBtn);
        }
    })

    deleteBtn.addEventListener('click', submitTrigger)
    saveBtn.addEventListener('click', submitTrigger)
}