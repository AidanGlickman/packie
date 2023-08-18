import { exCH } from '$lib/server/cityhive';
import { searchForTermMultiple } from '$lib/server/provider';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData()
        // console.log(data)
        const term = data.get('term') as string
        // const results = await exCH[0].searchForTerm(term)
        const results = await searchForTermMultiple(exCH, term)
        return {
            success: true,
            body: results
        }
    }
}
