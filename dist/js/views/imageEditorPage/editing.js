import{updateImageEditPage}from './imageEditorPage.js'
import{store}from '../../store/store.js'
import{router}from '../../router.js'
const ninetyDegrees=90
const three60Degrees=360
const tenPercent=10
const oneHundredPercent=100
const edits={rotateVal:0,cropImageVal:{},resizeImageVal:oneHundredPercent,updateRotateVal(angle){this.rotateVal=angle},updateCropVal(width,height,positionX,positionY){this.cropImageVal={width,height,positionX,positionY,}},updateResizeImageVal(percentage){this.resizeImageVal=percentage},clear(){this.rotateVal=0
this.cropImageVal={}
this.resizeImageVal=0}}
function rotateLeft(state){edits.updateRotateVal(edits.rotateVal-ninetyDegrees)
const{rotateVal,cropImageVal,resizeImageVal}=edits
updateImageEditPage({...state,newEdits:{rotateVal,cropImageVal,resizeImageVal}})}
function rotateRight(state){edits.updateRotateVal(edits.rotateVal+ninetyDegrees)
const{rotateVal,cropImageVal,resizeImageVal}=edits
updateImageEditPage({...state,newEdits:{rotateVal,cropImageVal,resizeImageVal}})}
function shrink(state){edits.updateResizeImageVal(edits.resizeImageVal-tenPercent)
const{rotateVal,cropImageVal,resizeImageVal}=edits
updateImageEditPage({...state,newEdits:{rotateVal,cropImageVal,resizeImageVal}})}
function enlarge(state){edits.updateResizeImageVal(edits.resizeImageVal+tenPercent)
const{rotateVal,cropImageVal,resizeImageVal}=edits
updateImageEditPage({...state,newEdits:{rotateVal,cropImageVal,resizeImageVal}})}
function saveEdits({subreddit,timefilter,imageId,folderpage}){const navigationUrl=!folderpage?`/sub/${subreddit}/${timefilter}/imageviewer/${imageId}`:`/folders/${folderpage}/imageviewer/${imageId}`
const{rotateVal,cropImageVal,resizeImageVal}=edits
store.addEditsToImage(imageId,{rotateVal,cropImageVal,resizeImageVal},folderpage)
edits.clear()
router.navigate(navigationUrl)}
function cancelEditsOnNavAway(){edits.clear()}
function convertImageEditsToCssString(storedEdits,newEdits){if(!newEdits&&!storedEdits)return ''
const rotateVal=newEdits?.rotateVal?newEdits.rotateVal:(storedEdits?.rotateVal??0)
const resizeVal=newEdits?.resizeImageVal?newEdits.resizeImageVal:(storedEdits?.resizeImageVal??oneHundredPercent)
edits.updateRotateVal(rotateVal)
edits.updateResizeImageVal(resizeVal)
const rotateCss=imageRightSideUp(rotateVal)?'':`transform: rotate(${rotateVal}deg);`
const resizeCss=resizeVal===oneHundredPercent?'':`height: ${resizeVal}%;`
const clipCss=';'
return `${rotateCss}${clipCss}${resizeCss}`}
function calculateCropCssClipPath(){}
function imageRightSideUp(rotateVal){return(rotateVal===0||(rotateVal%three60Degrees)===0)}
export{rotateLeft,rotateRight,saveEdits,cancelEditsOnNavAway,shrink,enlarge,convertImageEditsToCssString,}