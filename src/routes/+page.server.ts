import { searchForTerm } from '$lib/server/cityhive'
import { exCH } from '$lib/cityhive'

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        console.log(data)
        const term = data.get('term') as string
        const results = await searchForTerm(term, exCH[0])
        return results
    }
};
