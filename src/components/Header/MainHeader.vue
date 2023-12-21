<template>
    
    <header id="header">
        <section class="container">
            <SiteLogo />
            <SearchBar />
            <div class="header-right">
                <PostNotification />
                <UserProfile />
                <!-- <LoginButton /> -->
                <!-- <SignupButton /> -->
            </div>
        </section>
    </header>
</template>

<script>
import SearchBar from './SearchBar.vue'
import SiteLogo from './Logo.vue'
import PostNotification from './Notification.vue'
import UserProfile from './UserProfileIcon.vue'
// import LoginButton from './Header/LoginButton.vue'
// import SignupButton from './Header/SignupButton.vue'

export default {
    name: 'MainHeader',
    components: {
    SearchBar,
    SiteLogo,
    PostNotification,
    UserProfile,
    // LoginButton,
    // SignupButton
},
}
</script>
