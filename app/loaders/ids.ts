import groq from 'groq'

export const queryHomeID = groq`
	*[_type=="generalSettings"][0].home->_id
`

export const queryBlogID = groq`
	*[_type=="generalSettings"][0].blog->_id
`

export const queryErrorID = groq`
	*[_type=="generalSettings"][0].error->_id
`
