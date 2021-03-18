...mapActions('user', ['setSnackBarData']),

     if (err.response){
          this.setSnackBarData(err.response)
          this.setSnackBarState(true)
        }