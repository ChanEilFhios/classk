import { Modal } from 'bootstrap'

let db

export const name = 'task'
export const schema = '++id, class, name, duedate'
export const registerDataMgr = newDataMgr => db = newDataMgr

export const addTask = (newTask) => db.tables(name).add(newTask)

export const updateTask = (updatedTask) => {

}

export const deleteTask = (taskId) => {

}

export const initModal = (modalElement) => {
    const crudModal = modalElement
    const bsModal = new Modal(crudModal)

    const modalTitle = crudModal.querySelector(".modal-title")
    const form = crudModal.querySelector('#classktaskform')
    const deleteBtn = crudModal.querySelector('#taskdelete')
    const saveBtn = crudModal.querySelector('#tasksave')
    const dueDate = crudModal.querySelector('input[type="datetime-local"]')

    const resetModal = () => {
        form.reset()
        dueDate.value = new Date(Date.now()).toJSON().substring(0, 16);
        dueDate.min = new Date(Date.now()).toJSON().substring(0, 16);
        modalTitle.innerHTML = "New Task"

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
    form.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            form.requestSubmit(saveBtn)
        }
    })

    form.addEventListener('submit', (e) => {
        const action = (e.submitter) ? e.submitter.getAttribute('data-classk-action') : 'save'
        e.preventDefault()
        const formData = new FormData(form, e.submitter)

        const taskData = Object.fromEntries(formData)
        if (action === 'save') addTask(taskData)
    
        bsModal.hide()
    })
}