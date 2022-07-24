<template>

<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link
                tag="a"
                to="/"
                class="nav-item"
            >
                <a style="color: white;" class="navbar-brand">Product List</a>
                
    </router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <router-link
                active-class="active"
                tag="li"
                to="/product-purchase"
                class="nav-item"
            >
                <a class="nav-link">Product Operations</a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/product-sell"
                class="nav-item"
            >
                <a class="nav-link">Product Outlet</a>
            </router-link>

        </ul>
    </div>
</nav>

</template>

<script>


</script>