import { exCH } from '$lib/server/cityhive';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        console.log(data)
        const term = data.get('term') as string
        const results = await exCH[0].searchForTerm(term)
        return results
    }
};
