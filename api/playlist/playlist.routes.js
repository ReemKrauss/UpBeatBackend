const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getPlaylist, getPlaylists, deletePlaylist, updatePlaylist, addPlaylist, addDemo } = require('./playlist.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPlaylists)
router.put('/addDemo', addDemo)
router.get('/:id', getPlaylist)
router.post('/', addPlaylist)
router.put('/:id', updatePlaylist)
router.delete('/:id', deletePlaylist)

module.exports = router