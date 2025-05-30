import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Divider from './Divider';

describe(Divider, () => {
    it('Рендерит разделитель', () => {
        const { getByRole } = render(<Divider />);

        const divider = getByRole('separator');
        expect(divider).toBeInTheDocument();
    });
});
