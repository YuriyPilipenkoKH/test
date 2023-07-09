
{!photo 
    ? <Camera   ref={setsnap}
      style = {[postStyles.photoFrame, styles.camera, ]}>
      </Camera>
    : <Image source={photo}/>}
      <TouchableOpacity
            onPress={takePicture}
             style = {styles.cameraBtn}>
              <MaterialIcons name="photo-camera" size={24} color="#bdbdbd" />
            </TouchableOpacity>

const styles = StyleSheet.create({

    cameraBtn: {
        position: 'absolute',
        right: '50%',
        top: '25%',
        transform: [{ translateX: 30 },{ translateY: 30 }],
        width: 60,
        height: 60,
        backgroundColor: '#fff3',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
