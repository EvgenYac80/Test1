            var id, name,email,id_token;
		    function onSignIn(googleUser) {
				
				var  profile = googleUser.getBasicProfile();
				id=profile.getId(); 
				name=profile.getName();
				console.log("Image URL: " + profile.getImageUrl());
				email=profile.getEmail();

				// The ID token you need to pass to your backend:
				id_token = googleUser.getAuthResponse().id_token;
				console.log("ID Token: " + id_token);
				$("#oauth").hide();
				$("#mainData").show();
				
		    };
			function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
				console.log('User signed out.');
				});
				auth2.disconnect().then(function () {
				console.log('User signed disconnect.');
			    });
				};
			
			   /* angular.module("oauth2g",[])
				
				.factory("clientObg", function client(){
					if(id)	return {"id":id, "name":name,"email":email,"id_token":id_token};
					else setTimeout(client, 1000);
				});*/
				
			
				