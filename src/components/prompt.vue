<template>
  <button @click="deleteAllUsers">
  <button @click="deleteAllUsersWithAsync">
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useConfirm } from 'v3confirm'

  export default defineComponent({
    setup: () => {
      const confirm = useConfirm()

      const deleteAllUsers = () => {
        confirm.show('Are you sure?').then((ok) => {
          if (ok) {
            alert('All users deleted')
          } else {
            alert('Users not deleted')
          }
        })
      }

      const deleteAllUsersWithAsync = async () => {
        const ok = await confirm.show('Are you sure?')

        if (ok) {
          alert('All users deleted')
        } else {
          alert('Users not deleted')
        }
      }

      return {
        deleteAllUsers,
        deleteAllUsersWithAsync,
      }
    },
  })
</script>