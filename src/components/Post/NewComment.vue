<template>
<div id="dropcaps" class="row">
    <div class="col-md-12">
      <div class="page-content page-shortcode">
        <!-- <div class="boxedtitle page-title"><h2>New Comment</h2></div> -->
        <form class="form-style form-style-3">
          <div class="form-textarea">
            <p>
              <textarea aria-required="true" cols="58" rows="5">Your Comment</textarea>
            </p>
          </div>
          <p class="form-submit">
            <input name="submit" type="submit" value="Submit" class="submit button medium color">
          </p>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewComment",
};
</script>
