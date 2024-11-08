import { Modal } from 'bootstrap'

export const initModal = (modalElement) => {
    const crudModal = modalElement
    const bsModal = new Modal(crudModal)

    const form = crudModal.querySelector('#classktaskform')
    const deleteBtn = crudModal.querySelector('#taskdelete')
    const saveBtn = crudModal.querySelector('#tasksave')

    const resetModal = () => {
        form.reset()
        deleteBtn.classList.add('d-none')
    }
    const loadTask = () => {}

    crudModal.addEventListener('show.bs.modal', (e) => {
        const trigger = e.relatedTarget //Which button triggered the modal.
        const taskId = trigger.getAttribute('data-classk-taskid')
        
        if (taskId) {
            //We're modifying
            loadTask(taskId)
        } else {
            //We're adding a new one.
            resetModal()
        }
    })

    form.addEventListener('submit', (e) => {
        const action = (e.submitter) ? e.submitter.getAttribute('data-classk-action') : 'save'
        const formData = new FormData(e.target, e.submitter)

        console.log("action", action, "Form Data")
        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
        }
    
        bsModal.hide()
    })
}