let crudModal
let taskId
let form
let deleteBtn

export const resetModal = () => {
    if (form) form.reset()

    if (deleteBtn) deleteBtn.classList.add('d-none')
}

export const initModal = (modalElement) => {
    crudModal = modalElement
    form = crudModal.querySelector('form')
    deleteBtn = crudModal.querySelector('#taskdelete')

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
}