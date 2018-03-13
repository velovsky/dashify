<template>
  <div class="test">
    <h1>{{title}}</h1>
    <p>{{user.firstName}}</p>
    <p v-text="user.lastName"></p>
  </div>
</template>

<script>
  export default
  {
    name: 'test',  
    data()
    {
        return {
            title: 'Hello World',
            user: 
            {
                firstName: "Samuel",
                lastName: "Jackson"
            }
        }
    }
  }
</script>

<style scoped lange="scss">

.test
{
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #a00000;
}

</style>